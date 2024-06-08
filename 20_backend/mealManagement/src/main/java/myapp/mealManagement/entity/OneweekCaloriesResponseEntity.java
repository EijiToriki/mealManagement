package myapp.mealManagement.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Data
public class OneweekCaloriesResponseEntity {
    private List<String> dates;
    private List<Double> calories;
}
