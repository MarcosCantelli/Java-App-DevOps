package com.mvrc.ecommerce.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data                           // Lombok gera getters, setters e toString automaticamente
@Entity                         // Diz ao Spring que essa classe representa uma tabela no banco
@Table(name = "categorias")     // Nome da tabela no MySQL
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(length = 255)
    private String descricao;

    @Column(name = "criado_em")
    private LocalDateTime criado_em;
}