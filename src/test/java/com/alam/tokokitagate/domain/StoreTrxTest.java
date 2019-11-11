package com.alam.tokokitagate.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.alam.tokokitagate.web.rest.TestUtil;

public class StoreTrxTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StoreTrx.class);
        StoreTrx storeTrx1 = new StoreTrx();
        storeTrx1.setId(1L);
        StoreTrx storeTrx2 = new StoreTrx();
        storeTrx2.setId(storeTrx1.getId());
        assertThat(storeTrx1).isEqualTo(storeTrx2);
        storeTrx2.setId(2L);
        assertThat(storeTrx1).isNotEqualTo(storeTrx2);
        storeTrx1.setId(null);
        assertThat(storeTrx1).isNotEqualTo(storeTrx2);
    }
}
