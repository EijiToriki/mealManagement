package myapp.mealManagement.controller;

import lombok.RequiredArgsConstructor;
import myapp.mealManagement.entity.MealInquiryResponseEntity;
import myapp.mealManagement.service.MealInquiryService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Controller
@RequestMapping
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MealInquiryController {
    private final MealInquiryService mealInquiryService;
    @GetMapping("/get_dairy_data")
    public MealInquiryResponseEntity get_inquiry_data(@RequestParam LocalDate startDate, LocalDate endDate, int user_id){
        return mealInquiryService.get_inquiry_data(startDate, endDate, user_id);
    }
}
