package myapp.mealManagement.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Repository
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> get_user(String name, String password){
        String sql = "SELECT id FROM user WHERE name = ? AND password = ?";
        return jdbcTemplate.queryForList(sql, name, password);
    }

    @Override
    public int register_user(String name, String password) {
        String sql = "insert into user (name, password) values (?, ?)";
        return jdbcTemplate.update(sql, name, password);
    }
}
