package kr.stockey.investmentservice;

import kr.stockey.investmentservice.enums.InvCategory;
import lombok.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

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

    @Test
    public void testGetStEdWeekDates() {
        List<LocalDateTime> weekDates = getStEdWeekDates();

        // Verify the size of the returned list is 2
        Assertions.assertEquals(2, weekDates.size());

        // Verify Monday's date and time
        LocalDateTime monday = weekDates.get(0);
        System.out.println("monday = " + monday);

        // Verify Sunday's date and time
        LocalDateTime sunday = weekDates.get(1);
        System.out.println("sunday = " + sunday);
    }

    private List<LocalDateTime> getStEdWeekDates() {
        // Get this week's Monday and Sunday information based on today's date and time
        LocalDateTime dateTime = LocalDateTime.now();
        LocalDateTime sunday = dateTime.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY)).withHour(23).withMinute(59).withSecond(59);
        LocalDateTime monday = sunday.minusDays(6).withHour(0).withMinute(0).withSecond(0);
        return Arrays.asList(monday, sunday);
    }

    @Test
    public void testContractsByCategory() {
        // Initialize the list of ContractDto objects
        List<ContractDto> contracts = Arrays.asList(
                new ContractDto(1L, 1L, "Contract 1", InvCategory.CONTRACT),
                new ContractDto(1L, 1L,"Contract 2", InvCategory.CONTRACT),
                new ContractDto(1L, 1L,"Order 1", InvCategory.ORDER),
                new ContractDto(1L, 1L,"Order 2", InvCategory.ORDER),
                new ContractDto(1L, 1L,"Contract 3", InvCategory.CONTRACT)
        );

        // Apply the grouping operation
        Map<InvCategory, List<ContractDto>> contractsByCategory = contracts.stream()
                .collect(Collectors.groupingBy(ContractDto::getCategory));

        // Verify the correctness of the grouping
        List<ContractDto> contractList = contractsByCategory.get(InvCategory.CONTRACT);
        List<ContractDto> orderList = contractsByCategory.get(InvCategory.ORDER);

        // Assert the expected results
        Assertions.assertNotNull(contractList);
        Assertions.assertEquals(3, contractList.size());

        Assertions.assertNotNull(orderList);
        Assertions.assertEquals(2, orderList.size());
    }

    public static class ContractDto {
        private Long id;
        private Long matchOrderId;
        private String name;
        private InvCategory category;

        public ContractDto() {
        }

        public ContractDto(Long id, Long matchOrderId, String name, InvCategory category) {
            this.id = id;
            this.matchOrderId = matchOrderId;
            this.name = name;
            this.category = category;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public Long getMatchOrderId() {
            return matchOrderId;
        }

        public void setMatchOrderId(Long matchOrderId) {
            this.matchOrderId = matchOrderId;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public InvCategory getCategory() {
            return category;
        }

        public void setCategory(InvCategory category) {
            this.category = category;
        }
    }

    @Test
    void testContractMapping() {
        // Given
        ContractDto contract1 = new ContractDto(1L, 3L, "contract1", InvCategory.CONTRACT);
        ContractDto contract2 = new ContractDto(2L, 4L, "contract2", InvCategory.CONTRACT);

        ContractDto order1 = new ContractDto(3L, null, "order1", InvCategory.ORDER);
        ContractDto order2 = new ContractDto(4L, null, "order2", InvCategory.ORDER);

        List<ContractDto> contractList = Arrays.asList(contract1, contract2);

        // When
        Map<Long, ContractDto> contractMap = contractList.stream()
                .collect(Collectors.toMap(ContractDto::getMatchOrderId, contract -> contract));

        // Then
        assertEquals(2, contractMap.size());
        assertTrue(contractMap.containsKey(3L));
        assertTrue(contractMap.containsKey(4L));
        assertEquals(contract1, contractMap.get(order1.getId()));
        assertEquals(contract2, contractMap.get(order2.getId()));
    }


}
