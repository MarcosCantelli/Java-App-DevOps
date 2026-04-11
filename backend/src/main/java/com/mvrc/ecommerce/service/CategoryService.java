package com.mvrc.ecommerce.service;

import com.mvrc.ecommerce.model.Category;
import com.mvrc.ecommerce.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@RequiredArgsConstructor // Lombok injeta o repositório via construtor
@Service

public class CategoryService 
{

    private final CategoryRepository categoryRepository;

    public List<Category> findAll()
    {
        return categoryRepository.findAll();
    }

    public Category findById(Long id)
    {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada: " + id));
    }
    
}
