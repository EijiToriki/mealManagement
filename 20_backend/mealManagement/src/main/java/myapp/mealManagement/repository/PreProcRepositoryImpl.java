package myapp.mealManagement.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Repository
public class PreProcRepositoryImpl implements PreProcRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> get_all_foods(){
        String sql = "select * from food";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public void insert_dummy_food(int num){
        String sql = "insert into food (name, calories, protein, carbs, fat, salt, created_at) " +
                        "values (?, ?, ?, ?, ?, ?, ?)";

        for(int i=0; i < num; i++){
            String name = generate_random_string(5);

            Random rand = new Random();
            double calories = Math.round((100.0 + (1000.0 - 100.0) * rand.nextDouble()) * 10.0) / 10.0;
            double protein = Math.round((1.0 + (20.0 - 1.0) * rand.nextDouble()) * 10.0) / 10.0;
            double carbs = Math.round((1.0 + (200.0 - 1.0) * rand.nextDouble()) * 10.0) / 10.0;
            double fat = Math.round((1.0 + (40.0 - 1.0) * rand.nextDouble()) * 10.0) / 10.0;
            double salt = Math.round((0.5 + (5.0 - 0.5) * rand.nextDouble()) * 10.0) / 10.0;

            Date now = new Date();
            Timestamp created_at = new Timestamp(now.getTime());

            jdbcTemplate.update(sql, name, calories, protein, carbs, fat, salt, created_at);
        }
    }

    @Override
    public void insert_dummy_meal(int num){
        String sql = "insert into meal (date, time, name, calories, protein, carbs, fat, salt, created_at) " +
                "values (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        String[] times = {"朝", "昼", "夜"};

        for(int i=0; i < num; i++){
            Random rand = new Random();
            LocalDate date = get_random_date();

            int randomIndex = rand.nextInt(times.length);
            String time = times[randomIndex];

            String name = generate_random_string(5);

            double calories = Math.round((100.0 + (1000.0 - 100.0) * rand.nextDouble()) * 10.0) / 10.0;
            double protein = Math.round((1.0 + (20.0 - 1.0) * rand.nextDouble()) * 10.0) / 10.0;
            double carbs = Math.round((1.0 + (200.0 - 1.0) * rand.nextDouble()) * 10.0) / 10.0;
            double fat = Math.round((1.0 + (40.0 - 1.0) * rand.nextDouble()) * 10.0) / 10.0;
            double salt = Math.round((0.5 + (5.0 - 0.5) * rand.nextDouble()) * 10.0) / 10.0;

            Date now = new Date();
            Timestamp created_at = new Timestamp(now.getTime());

            jdbcTemplate.update(sql, date, time, name, calories, protein, carbs, fat, salt, created_at);
        }
    }

    public String generate_random_string(int length){
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();

        StringBuilder stringBuilder = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            stringBuilder.append(characters.charAt(index));
        }

        return stringBuilder.toString();
    }

    public LocalDate get_random_date(){
        LocalDate today = LocalDate.now();

        // 一ヶ月前の日付を取得
        LocalDate oneMonthAgo = today.minus(1, ChronoUnit.MONTHS);

        // 今日から一ヶ月前の日付までの日数を計算
        long daysBetween = ChronoUnit.DAYS.between(oneMonthAgo, today);

        // ランダムな日数を生成
        Random rand = new Random();
        long randomDays = rand.nextInt((int) daysBetween + 1);

        // ランダムな日付を計算
        return oneMonthAgo.plusDays(randomDays);
    }
}
