package myapp.mealManagement.controller;

import lombok.RequiredArgsConstructor;
import myapp.mealManagement.entity.FoodEntity;
import myapp.mealManagement.service.PreProcService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PreProcController {
    private final PreProcService preProcService;

    @GetMapping("/all_foods")
    public List<FoodEntity> get_all_foods(){
        return preProcService.get_all_foods();
    }

    @PostMapping("/insert_dummy_food")
    public void insert_dummy_food(int num){
        preProcService.insert_dummy_food(num);
    }

    @PostMapping("/insert_dummy_meal")
    public void insert_dummy_meal(int num){
        preProcService.insert_dummy_meal(num);
    }
}
