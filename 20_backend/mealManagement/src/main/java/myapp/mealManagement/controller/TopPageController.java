package myapp.mealManagement.controller;

import lombok.RequiredArgsConstructor;
import myapp.mealManagement.entity.OneweekCaloriesResponseEntity;
import myapp.mealManagement.entity.TodayNutritionResponseEntity;
import myapp.mealManagement.service.TopPageService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TopPageController {
    private final TopPageService topPageService;

    @GetMapping("/get_oneweek_calories")
    public OneweekCaloriesResponseEntity get_oneweek_calories(@RequestParam int user_id){
        return topPageService.get_oneweek_calories(user_id);
    }

    @GetMapping("/get_today_nutrition")
    public List<TodayNutritionResponseEntity> get_today_nutrition(@RequestParam int user_id){
        return topPageService.get_today_nutrition(user_id);
    }

    @GetMapping("/get_achievement_day")
    public int get_achievement_day(@RequestParam int user_id) {
        return topPageService.get_achievement_day(user_id);
    }

}
