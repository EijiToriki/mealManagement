package myapp.mealManagement.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class TopPageRepositoryImpl implements TopPageRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> get_oneweek_calories(){
        String sql = "SELECT date, ROUND(SUM(calories), 1) AS total_calories " +
                    "FROM meal " +
                    "WHERE date >= CURDATE() - INTERVAL 6 DAY " +
                    "AND date <= CURDATE() GROUP BY date " +
                    "ORDER BY date";

        return jdbcTemplate.queryForList(sql);
    }
}
