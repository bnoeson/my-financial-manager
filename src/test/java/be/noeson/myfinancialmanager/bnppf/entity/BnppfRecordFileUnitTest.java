package be.noeson.myfinancialmanager.bnppf.entity;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;

import java.io.IOException;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.not;
import static org.junit.Assert.assertThat;

public class BnppfRecordFileUnitTest {

    @Test
    public void test_fileFieldIsIgnored_whenDtoIsSerialized()
            throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        BnppfRecordFileEntity jsonObject = new BnppfRecordFileEntity.Builder()
                .file(new byte[1])
                .name("name")
                .size(1L)
                .build();

        String jsonAsString = mapper.writeValueAsString(jsonObject);

        assertThat(jsonAsString, not(containsString("file")));
    }

}
