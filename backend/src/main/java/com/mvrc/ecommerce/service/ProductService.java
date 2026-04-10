package com.mvrc.ecommerce.service;

import com.mvrc.ecommerce.model.Product;
import com.mvrc.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> findAllActive() {
        return productRepository.findByAtivoTrue();
    }

    public List<Product> findByCategory(Long categoria_id) {
        return productRepository.findByCategoriaId(categoria_id);
    }

    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado: " + id));
    }
}