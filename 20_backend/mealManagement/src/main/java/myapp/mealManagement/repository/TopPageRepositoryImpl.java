package myapp.mealManagement.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public class TopPageRepositoryImpl implements TopPageRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> get_oneweek_calories(int user_id){
        String sql = "SELECT date, ROUND(SUM(calories), 1) AS total_calories " +
                    "FROM meal " +
                    "WHERE date >= CURDATE() - INTERVAL 6 DAY " +
                    "AND date <= CURDATE() AND user_id = ? " +
                    "GROUP BY date " +
                    "ORDER BY date";

        return jdbcTemplate.queryForList(sql, user_id);
    }

    @Override
    public List<Map<String, Object>> get_today_nutrition(int user_id){
        String sql = "SELECT " +
                        "COALESCE(SUM(calories), 0) AS 熱量," +
                        "COALESCE(SUM(protein), 0) AS タンパク質, " +
                        "COALESCE(SUM(carbs), 0) AS 炭水化物, " +
                        "COALESCE(SUM(fat), 0) AS 脂質, " +
                        "COALESCE(SUM(salt), 0) AS 食塩相当量 " +
                    "FROM meal WHERE date = CURRENT_DATE AND user_id = ? ";
        return jdbcTemplate.queryForList(sql, user_id);
    }

    @Override
    public List<Map<String, Object>> get_average_nutrition(){
        String sql = "SELECT nutrients, quantity FROM target WHERE age_id = 1";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> get_oneday_nutrition(LocalDate date, int user_id){
        String sql = "SELECT " +
                "COALESCE(SUM(calories), 0) AS 熱量," +
                "COALESCE(SUM(protein), 0) AS タンパク質, " +
                "COALESCE(SUM(carbs), 0) AS 炭水化物, " +
                "COALESCE(SUM(fat), 0) AS 脂質, " +
                "COALESCE(SUM(salt), 0) AS 食塩相当量 " +
                "FROM meal WHERE date = ? AND user_id = ? ";
        return jdbcTemplate.queryForList(sql, date, user_id);
    }
}
