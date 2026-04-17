package com.mvrc.ecommerce.controller;

import com.mvrc.ecommerce.model.Product;
import com.mvrc.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(" docker exec -it ecommerce sh\r\n" + //
        "/ # grep -r \"localhost:8080\" /usr/share/nginx/html\r\n" + //
        "")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // GET /api/products → retorna todos os produtos ativos
    @GetMapping
    public ResponseEntity<List<Product>> findAll() {
        return ResponseEntity.ok(productService.findAllActive());
    }

    // GET /api/products/1 → retorna produto com id 1
    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    // GET /api/products/category/1 → produtos de uma categoria
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Product>> findByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(productService.findByCategory(categoryId));
    }
}