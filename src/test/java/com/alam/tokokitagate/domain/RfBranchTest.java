package com.alam.tokokitagate.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.alam.tokokitagate.web.rest.TestUtil;

public class RfBranchTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RfBranch.class);
        RfBranch rfBranch1 = new RfBranch();
        rfBranch1.setId(1L);
        RfBranch rfBranch2 = new RfBranch();
        rfBranch2.setId(rfBranch1.getId());
        assertThat(rfBranch1).isEqualTo(rfBranch2);
        rfBranch2.setId(2L);
        assertThat(rfBranch1).isNotEqualTo(rfBranch2);
        rfBranch1.setId(null);
        assertThat(rfBranch1).isNotEqualTo(rfBranch2);
    }
}
