package myapp.mealManagement.controller;

import lombok.RequiredArgsConstructor;
import myapp.mealManagement.entity.FoodEntity;
import myapp.mealManagement.service.AllInquiryService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
@RequestMapping
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AllInquiryController {
    private final AllInquiryService allInquiryService;

    @GetMapping("/all_foods")
    public List<FoodEntity> get_all_foods(){
        return allInquiryService.get_all_foods();
    }
}
