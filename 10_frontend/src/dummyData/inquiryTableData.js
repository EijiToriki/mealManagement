function createData(no, date, time, mealName, calories, protein, carbs, fat, salt) {
  return { no, date, time, mealName, calories, protein, carbs, fat, salt };
}

export const rows = [
  createData(1, "2024/06/01", "昼", 'チャーハン', 500, 14, 60, 21, 4.5),
  createData(2, "2024/06/01", "夜", '餃子', 350, 9, 37, 12, 2.3),
  createData(3, "2024/06/02", "昼", '焼きそば', 600, 16, 50, 15, 3.3),
];