package myapp.mealManagement.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public class MealInquiryRepositoryImpl implements MealInquiryRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> get_meal_history(LocalDate startDate, LocalDate endDate, int user_id){
        String sql = "SELECT date, time, name, calories, protein, fat, carbs, salt " +
                    "FROM meal WHERE user_id = ? AND date BETWEEN ? AND ? ORDER BY date ASC";

        return jdbcTemplate.queryForList(sql, user_id, startDate, endDate);
    }

    @Override
    public List<Map<String, Object>> get_dairy_data(LocalDate startDate, LocalDate endDate, int user_id) {
        String sql = "SELECT date, " +
                "ROUND(SUM(calories), 1) AS total_calories, " +
                "ROUND(SUM(protein), 1) AS total_protein, " +
                "ROUND(SUM(fat), 1) AS total_fat, " +
                "ROUND(SUM(carbs), 1) AS total_carbs, " +
                "ROUND(SUM(salt), 1) AS total_salt " +
                "FROM meal " +
                "WHERE user_id = ? AND  date BETWEEN ? AND ? " +
                "GROUP BY date " +
                "ORDER BY date ASC";

        return jdbcTemplate.queryForList(sql, user_id, startDate, endDate);
    }
}
