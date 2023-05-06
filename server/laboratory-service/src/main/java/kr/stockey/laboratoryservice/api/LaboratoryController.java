package kr.stockey.laboratoryservice.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LaboratoryController {
    @GetMapping("search/stock")
    public ResponseEntity<?> searchStock() {
        return ResponseEntity.ok("");
    }
}
