package kr.stockey.investmentservice;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

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

        Assertions.assertEquals(name, personDTOs.get(0).getName());
        Assertions.assertEquals(age, personDTOs.get(0).getAge());
    }
}
