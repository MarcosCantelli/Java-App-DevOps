package com.mvrc.ecommerce.controller;

import com.mvrc.ecommerce.model.Category;
import com.mvrc.ecommerce.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController                   // Diz que essa classe responde requisições HTTP com JSON
@RequestMapping("/api/categories") // Todas as rotas começam com /api/categories
@CrossOrigin(origins = "*")       // Permite chamadas do Angular
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    // GET /api/categories → retorna todas as categorias
    @GetMapping
    public ResponseEntity<List<Category>> findAll() {
        return ResponseEntity.ok(categoryService.findAll());
    }

    // GET /api/categories/1 → retorna categoria com id 1
    @GetMapping("/{id}")
    public ResponseEntity<Category> findById(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.findById(id));
    }
}