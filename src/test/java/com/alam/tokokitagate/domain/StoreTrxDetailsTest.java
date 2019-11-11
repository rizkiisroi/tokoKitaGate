package com.alam.tokokitagate.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.alam.tokokitagate.web.rest.TestUtil;

public class StoreTrxDetailsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StoreTrxDetails.class);
        StoreTrxDetails storeTrxDetails1 = new StoreTrxDetails();
        storeTrxDetails1.setId(1L);
        StoreTrxDetails storeTrxDetails2 = new StoreTrxDetails();
        storeTrxDetails2.setId(storeTrxDetails1.getId());
        assertThat(storeTrxDetails1).isEqualTo(storeTrxDetails2);
        storeTrxDetails2.setId(2L);
        assertThat(storeTrxDetails1).isNotEqualTo(storeTrxDetails2);
        storeTrxDetails1.setId(null);
        assertThat(storeTrxDetails1).isNotEqualTo(storeTrxDetails2);
    }
}
