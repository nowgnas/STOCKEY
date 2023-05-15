package kr.stockey.investmentservice;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class JustTest {

    @Test
    public void 직전시간Test() {
        LocalDateTime currentTime = LocalDateTime.now();
        LocalDateTime previousHour = currentTime.minusHours(1);

        // Set the minutes and seconds to zero for the previous hour
        LocalDateTime startOfPreviousHour = previousHour.withMinute(0).withSecond(0).withNano(0);
        LocalDateTime endOfPreviousHour = previousHour.withMinute(0).withSecond(0).withNano(0).plusHours(1);

        System.out.println("startOfPreviousHour = " + startOfPreviousHour);
        System.out.println("endOfPreviousHour = " + endOfPreviousHour);
    }

    public static class PersonDTO {
        private String name;
        private int age;

        public PersonDTO(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public String getName() {
            return name;
        }

        public int getAge() {
            return age;
        }
    }

    @Test
    public void testPersonDTO() {
        String name = "John Doe";
        int age = 30;

        List<PersonDTO> personDTOs = List.of(new PersonDTO(name, age));

        assertEquals(name, personDTOs.get(0).getName());
        assertEquals(age, personDTOs.get(0).getAge());
    }

    @Test
    public void 특정날짜기준_그_주의_월요일_일요일_가져오기() {
        LocalDate today = LocalDate.of(2023, 5, 14); // 예시로 2023년 5월 14일을 사용합니다.

        LocalDate sunday = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
        LocalDate monday = sunday.minusDays(6);

        List<LocalDate> expectedDates = Arrays.asList(monday, sunday);

        List<LocalDate> actualDates = getWeekDates(today);

        assertEquals(expectedDates, actualDates);
    }

    private List<LocalDate> getWeekDates(LocalDate date) {
        LocalDate sunday = date.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
        LocalDate monday = sunday.minusDays(6);

        return Arrays.asList(monday, sunday);
    }

}
