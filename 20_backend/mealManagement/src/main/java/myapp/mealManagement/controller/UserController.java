package myapp.mealManagement.controller;

import lombok.RequiredArgsConstructor;
import myapp.mealManagement.entity.OneweekCaloriesResponseEntity;
import myapp.mealManagement.entity.TodayNutritionResponseEntity;
import myapp.mealManagement.service.TopPageService;
import myapp.mealManagement.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;

    @GetMapping("/get_user")
    public int get_user(@RequestParam String name, String password){
        return userService.get_user(name, password);
    }

    @PostMapping("/register_user")
    public int register_user(@RequestBody Map<String, String> payload){
        String name = payload.get("name");
        String password = payload.get("password");
        return userService.register_user(name, password);
    }

}
