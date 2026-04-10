pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        VM_IP      = '192.168.31.223'    // IP fixo da VM de aplicação
        VM_USER    = 'mvrc'
        DEPLOY_DIR = '/opt/app'
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Repositório: ${env.GIT_URL}"
                echo "Branch: ${env.GIT_BRANCH}"
                echo "Commit: ${env.GIT_COMMIT}"
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                    echo "JAR gerado com sucesso"
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'ng build --configuration production'
                    echo "Build Angular concluído"
                }
            }
        }

        stage('Deploy na VM') {
            steps {
                sh """
                    # Cria diretório de deploy se não existir
                    ssh -i /var/lib/jenkins/.ssh/ansible_key \
                        -o StrictHostKeyChecking=no \
                        ${VM_USER}@${VM_IP} \
                        'mkdir -p ${DEPLOY_DIR}/backend ${DEPLOY_DIR}/frontend'

                    # Copia o JAR
                    scp -i /var/lib/jenkins/.ssh/ansible_key \
                        -o StrictHostKeyChecking=no \
                        backend/target/*.jar \
                        ${VM_USER}@${VM_IP}:${DEPLOY_DIR}/backend/app.jar

                    # Copia os arquivos do frontend
                    scp -i /var/lib/jenkins/.ssh/ansible_key \
                        -o StrictHostKeyChecking=no \
                        -r frontend/dist/frontend/* \
                        ${VM_USER}@${VM_IP}:${DEPLOY_DIR}/frontend/

                    # Reinicia o backend
                    ssh -i /var/lib/jenkins/.ssh/ansible_key \
                        -o StrictHostKeyChecking=no \
                        ${VM_USER}@${VM_IP} \
                        'sudo systemctl restart ecommerce-backend || true'
                """
            }
        }

    }

    post {
        success {
            echo "Deploy realizado com sucesso na VM ${VM_IP}"
        }
        failure {
            echo "Pipeline falhou. Verifique os logs."
        }
    }
}