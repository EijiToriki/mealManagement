package myapp.mealManagement.controller;

import lombok.RequiredArgsConstructor;
import myapp.mealManagement.entity.OneweekCaloriesResponseEntity;
import myapp.mealManagement.service.TopPageService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TopPageController {
    private final TopPageService topPageService;

    @GetMapping("/get_oneweek_calories")
    public OneweekCaloriesResponseEntity get_oneweek_calories(){
        return topPageService.get_oneweek_calories();
    }

}
