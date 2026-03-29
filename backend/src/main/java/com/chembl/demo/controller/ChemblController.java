package com.chembl.demo.controller;

import com.chembl.demo.service.ChemblService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chembl")
@CrossOrigin(origins = "*")
public class ChemblController {

    private final ChemblService chemblService;

    public ChemblController(ChemblService chemblService) {
        this.chemblService = chemblService;
    }

    @GetMapping("/activities")
    public ResponseEntity<?> getActivities(
            @RequestParam String targetId,
            @RequestParam(required = false) String activityType) {

        try {
            return ResponseEntity.ok(
                    chemblService.fetchActivities(targetId, activityType)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("Unable to fetch data. Please check Target ID.");
        }
    }
}