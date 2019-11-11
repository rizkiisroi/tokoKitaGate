package com.alam.tokokitagate.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.alam.tokokitagate.web.rest.TestUtil;

public class RfCompanyTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RfCompany.class);
        RfCompany rfCompany1 = new RfCompany();
        rfCompany1.setId(1L);
        RfCompany rfCompany2 = new RfCompany();
        rfCompany2.setId(rfCompany1.getId());
        assertThat(rfCompany1).isEqualTo(rfCompany2);
        rfCompany2.setId(2L);
        assertThat(rfCompany1).isNotEqualTo(rfCompany2);
        rfCompany1.setId(null);
        assertThat(rfCompany1).isNotEqualTo(rfCompany2);
    }
}
