package myapp.mealManagement.service;

import lombok.RequiredArgsConstructor;
import myapp.mealManagement.entity.RegisterFoodRequestEntity;
import myapp.mealManagement.repository.FoodRegisterRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FoodRegisterSerivce {
    private final FoodRegisterRepository foodRegisterRepository;

    public int register_food(RegisterFoodRequestEntity registerFoodRequestEntity){
        return foodRegisterRepository.register_food(registerFoodRequestEntity);
    }
}
