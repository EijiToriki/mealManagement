package myapp.mealManagement.controller;

import lombok.RequiredArgsConstructor;
import myapp.mealManagement.entity.FoodAndMealResponseEntity;
import myapp.mealManagement.service.DeletePageService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DeletePageController {
    private final DeletePageService deletePageService;

    @GetMapping("get_all_meal_food")
    public FoodAndMealResponseEntity get_all_meal_food(){
        return deletePageService.get_all_meal_food();
    }

    @DeleteMapping("delete_one_meal")
    public int delete_one_meal(@RequestParam("id") int id){
        return deletePageService.delete_one_meal(id);
    }

    @DeleteMapping("delete_one_food")
    public int delete_one_food(@RequestParam("id") int id){
        return deletePageService.delete_one_food(id);
    }
}
