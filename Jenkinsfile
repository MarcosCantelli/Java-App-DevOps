pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        VM_IP      = '192.168.31.50'
        VM_USER    = 'mvrc'
        SSH_KEY    = '/var/lib/jenkins/.ssh/ansible_key'
        IMAGE_NAME = 'ecommerce-app'
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Branch: ${env.GIT_BRANCH}"
                echo "Commit: ${env.GIT_COMMIT}"
                sh 'java -version'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    withEnv([
                        'JAVA_HOME=/opt/java/jdk-17',
                        'PATH=/opt/java/jdk-17/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
                    ]) {
                        sh 'java -version'
                        sh 'mvn package -DskipTests -q'
                    }
                }
                echo "JAR gerado com sucesso"
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build -- --configuration=production'
                    echo "Angular compilado com sucesso"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${env.BUILD_NUMBER} -t ${IMAGE_NAME}:latest ."
                echo "Imagem Docker criada: ${IMAGE_NAME}:${env.BUILD_NUMBER}"
            }
        }

        stage('Deploy na VM') {
            steps {
                withCredentials([
                    string(credentialsId: 'db-host',     variable: 'DB_HOST'),
                    string(credentialsId: 'db-port',     variable: 'DB_PORT'),
                    string(credentialsId: 'db-name',     variable: 'DB_NAME'),
                    string(credentialsId: 'db-user',     variable: 'DB_USER'),
                    string(credentialsId: 'db-password', variable: 'DB_PASSWORD')
                ]) {
                    sh """
                        docker save ${IMAGE_NAME}:latest | gzip > /tmp/${IMAGE_NAME}.tar.gz

                        scp -i ${SSH_KEY} -o StrictHostKeyChecking=no \
                            /tmp/${IMAGE_NAME}.tar.gz \
                            ${VM_USER}@${VM_IP}:/tmp/

                        ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ${VM_USER}@${VM_IP} << 'ENDSSH'
                            docker load < /tmp/${IMAGE_NAME}.tar.gz
                            docker stop ecommerce 2>/dev/null || true
                            docker rm ecommerce 2>/dev/null || true
                            docker run -d \
                                --name ecommerce \
                                --restart unless-stopped \
                                -p 80:80 \
                                -p 8080:8080 \
                                -e DB_HOST=${DB_HOST} \
                                -e DB_PORT=${DB_PORT} \
                                -e DB_NAME=${DB_NAME} \
                                -e DB_USER=${DB_USER} \
                                -e DB_PASSWORD=${DB_PASSWORD} \
                                ${IMAGE_NAME}:latest
                            docker image prune -f
                            rm -f /tmp/${IMAGE_NAME}.tar.gz
ENDSSH

                        rm -f /tmp/${IMAGE_NAME}.tar.gz
                    """
                }
            }
        }

        stage('Verificar Deploy') {
            steps {
                sh """
                    echo "Aguardando aplicação inicializar..."
                    sleep 20
                    curl -sf http://${VM_IP}/api/products \
                        && echo "API respondendo corretamente" \
                        || echo "API ainda não respondeu — verifique os logs do container"
                    curl -sf http://${VM_IP} \
                        && echo "Frontend acessível" \
                        || echo "Frontend não acessível"
                """
            }
        }
    }

    post {
        success {
            echo "Deploy concluído com sucesso!"
            echo "Aplicação disponível em: http://${VM_IP}"
        }
        failure {
            echo "Deploy falhou. Verifique os logs acima."
        }
    }
}