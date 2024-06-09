package myapp.mealManagement.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class TodayNutritionResponseEntity {
    private String element;
    private Double quantity;
    private Double diff;
    private String border;
}
