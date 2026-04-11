package com.mvrc.ecommerce.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "produtos")

public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal preco;

    @Column(nullable = false)
    private Integer estoque;

    @Column(name = "imagem_url", length = 500)
    private String imagemUrl;

    @ManyToOne(fetch = FetchType.EAGER)   // Cada produto pertence a uma categoria
    @JoinColumn(name = "categoria_id")
    private Category categoria;

    @Column(nullable = false)
    private Boolean ativo = true;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm;;
    
}
