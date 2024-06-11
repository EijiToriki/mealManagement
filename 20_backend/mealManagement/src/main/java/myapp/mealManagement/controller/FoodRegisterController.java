package myapp.mealManagement.controller;

import lombok.RequiredArgsConstructor;
import myapp.mealManagement.entity.RegisterFoodRequestEntity;
import myapp.mealManagement.service.FoodRegisterSerivce;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FoodRegisterController {
    private final FoodRegisterSerivce foodRegisterSerivce;

    @PostMapping("/register_food")
    public int register_food(@RequestBody RegisterFoodRequestEntity registerFoodRequestEntity){
        return foodRegisterSerivce.register_food(registerFoodRequestEntity);
    }
}
