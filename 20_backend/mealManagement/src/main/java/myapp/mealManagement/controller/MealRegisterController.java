package myapp.mealManagement.controller;

import lombok.RequiredArgsConstructor;
import myapp.mealManagement.entity.FoodResponseEntity;
import myapp.mealManagement.entity.RegisterMealRequestEntity;
import myapp.mealManagement.service.MealRegisterService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MealRegisterController {
    private final MealRegisterService mealRegisterService;

    @GetMapping("/get_all_foods")
    public List<FoodResponseEntity> get_all_foods(@RequestParam int user_id){
        return mealRegisterService.get_all_foods(user_id);
    }

    @PostMapping("/register_meal")
    public int register_meal(@RequestBody RegisterMealRequestEntity registerMealRequestEntity){
        return mealRegisterService.register_meal(registerMealRequestEntity);
    }

}
