package com.chembl.demo.service;

import com.chembl.demo.model.Activity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class ChemblService {

    private static final String BASE_URL =
            "https://www.ebi.ac.uk/chembl/api/data/activity.json?target_chembl_id=";

    public Map<String, Object> fetchActivities(String targetId, String activityType) {

        RestTemplate restTemplate = new RestTemplate();
        String url = BASE_URL + targetId;

        try {
            Map response = restTemplate.getForObject(url, Map.class);

            if (response == null || !response.containsKey("activities")) {
                return Map.of("count", 0, "data", List.of());
            }

            List<Map<String, Object>> rawActivities =
                    (List<Map<String, Object>>) response.get("activities");

            List<Activity> filteredList = new ArrayList<>();

            for (Map<String, Object> item : rawActivities) {

                String type = (String) item.get("standard_type");

                if (activityType == null || activityType.isEmpty()
                        || (type != null && activityType.equalsIgnoreCase(type))) {

                    filteredList.add(new Activity(
                            (String) item.get("molecule_chembl_id"),
                            type,
                            String.valueOf(item.get("standard_value"))
                    ));
                }
            }

            return Map.of(
                    "count", filteredList.size(),
                    "data", filteredList
            );

        } catch (Exception e) {
            e.printStackTrace();

            return Map.of(
                    "count", 0,
                    "data", List.of(),
                    "error", "Failed to fetch data"
            );
        }
    }
}