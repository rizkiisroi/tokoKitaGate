package com.alam.tokokitagate.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.alam.tokokitagate.web.rest.TestUtil;

public class RfItemTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RfItem.class);
        RfItem rfItem1 = new RfItem();
        rfItem1.setId(1L);
        RfItem rfItem2 = new RfItem();
        rfItem2.setId(rfItem1.getId());
        assertThat(rfItem1).isEqualTo(rfItem2);
        rfItem2.setId(2L);
        assertThat(rfItem1).isNotEqualTo(rfItem2);
        rfItem1.setId(null);
        assertThat(rfItem1).isNotEqualTo(rfItem2);
    }
}
