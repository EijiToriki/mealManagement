package myapp.mealManagement.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@Data
public class MealInquiryResponseEntity {
    private List<MealResponseEntity> mealHistory;
    private List<LocalDate> dates;
    private List<Double> calories;
    private List<Double> proteins;
    private List<Double> fats;
    private List<Double> carbs;
    private List<Double> salts;
}
