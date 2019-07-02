package com.burns.chat.web.rest;

import com.burns.chat.ChatApp;

import com.burns.chat.domain.UserChannel;
import com.burns.chat.domain.User;
import com.burns.chat.domain.Channel;
import com.burns.chat.repository.UserChannelRepository;
import com.burns.chat.service.UserChannelService;
import com.burns.chat.service.dto.UserChannelDTO;
import com.burns.chat.service.mapper.UserChannelMapper;
import com.burns.chat.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.burns.chat.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UserChannelResource REST controller.
 *
 * @see UserChannelResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ChatApp.class)
public class UserChannelResourceIntTest {

    @Autowired
    private UserChannelRepository userChannelRepository;

    @Autowired
    private UserChannelMapper userChannelMapper;

    @Autowired
    private UserChannelService userChannelService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserChannelMockMvc;

    private UserChannel userChannel;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserChannelResource userChannelResource = new UserChannelResource(userChannelService, null);
        this.restUserChannelMockMvc = MockMvcBuilders.standaloneSetup(userChannelResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserChannel createEntity(EntityManager em) {
        UserChannel userChannel = new UserChannel();
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        userChannel.setUser(user);
        // Add required entity
        Channel channel = ChannelResourceIntTest.createEntity(em);
        em.persist(channel);
        em.flush();
        userChannel.setChannel(channel);
        return userChannel;
    }

    @Before
    public void initTest() {
        userChannel = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserChannel() throws Exception {
        int databaseSizeBeforeCreate = userChannelRepository.findAll().size();

        // Create the UserChannel
        UserChannelDTO userChannelDTO = userChannelMapper.toDto(userChannel);
        restUserChannelMockMvc.perform(post("/api/user-channels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userChannelDTO)))
            .andExpect(status().isCreated());

        // Validate the UserChannel in the database
        List<UserChannel> userChannelList = userChannelRepository.findAll();
        assertThat(userChannelList).hasSize(databaseSizeBeforeCreate + 1);
        UserChannel testUserChannel = userChannelList.get(userChannelList.size() - 1);
    }

    @Test
    @Transactional
    public void createUserChannelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userChannelRepository.findAll().size();

        // Create the UserChannel with an existing ID
        userChannel.setId(1L);
        UserChannelDTO userChannelDTO = userChannelMapper.toDto(userChannel);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserChannelMockMvc.perform(post("/api/user-channels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userChannelDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UserChannel in the database
        List<UserChannel> userChannelList = userChannelRepository.findAll();
        assertThat(userChannelList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserChannels() throws Exception {
        // Initialize the database
        userChannelRepository.saveAndFlush(userChannel);

        // Get all the userChannelList
        restUserChannelMockMvc.perform(get("/api/user-channels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userChannel.getId().intValue())));
    }

    @Test
    @Transactional
    public void getUserChannel() throws Exception {
        // Initialize the database
        userChannelRepository.saveAndFlush(userChannel);

        // Get the userChannel
        restUserChannelMockMvc.perform(get("/api/user-channels/{id}", userChannel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userChannel.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUserChannel() throws Exception {
        // Get the userChannel
        restUserChannelMockMvc.perform(get("/api/user-channels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserChannel() throws Exception {
        // Initialize the database
        userChannelRepository.saveAndFlush(userChannel);
        int databaseSizeBeforeUpdate = userChannelRepository.findAll().size();

        // Update the userChannel
        UserChannel updatedUserChannel = userChannelRepository.findOne(userChannel.getId());
        // Disconnect from session so that the updates on updatedUserChannel are not directly saved in db
        em.detach(updatedUserChannel);
        UserChannelDTO userChannelDTO = userChannelMapper.toDto(updatedUserChannel);

        restUserChannelMockMvc.perform(put("/api/user-channels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userChannelDTO)))
            .andExpect(status().isOk());

        // Validate the UserChannel in the database
        List<UserChannel> userChannelList = userChannelRepository.findAll();
        assertThat(userChannelList).hasSize(databaseSizeBeforeUpdate);
        UserChannel testUserChannel = userChannelList.get(userChannelList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingUserChannel() throws Exception {
        int databaseSizeBeforeUpdate = userChannelRepository.findAll().size();

        // Create the UserChannel
        UserChannelDTO userChannelDTO = userChannelMapper.toDto(userChannel);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserChannelMockMvc.perform(put("/api/user-channels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userChannelDTO)))
            .andExpect(status().isCreated());

        // Validate the UserChannel in the database
        List<UserChannel> userChannelList = userChannelRepository.findAll();
        assertThat(userChannelList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserChannel() throws Exception {
        // Initialize the database
        userChannelRepository.saveAndFlush(userChannel);
        int databaseSizeBeforeDelete = userChannelRepository.findAll().size();

        // Get the userChannel
        restUserChannelMockMvc.perform(delete("/api/user-channels/{id}", userChannel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserChannel> userChannelList = userChannelRepository.findAll();
        assertThat(userChannelList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserChannel.class);
        UserChannel userChannel1 = new UserChannel();
        userChannel1.setId(1L);
        UserChannel userChannel2 = new UserChannel();
        userChannel2.setId(userChannel1.getId());
        assertThat(userChannel1).isEqualTo(userChannel2);
        userChannel2.setId(2L);
        assertThat(userChannel1).isNotEqualTo(userChannel2);
        userChannel1.setId(null);
        assertThat(userChannel1).isNotEqualTo(userChannel2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserChannelDTO.class);
        UserChannelDTO userChannelDTO1 = new UserChannelDTO();
        userChannelDTO1.setId(1L);
        UserChannelDTO userChannelDTO2 = new UserChannelDTO();
        assertThat(userChannelDTO1).isNotEqualTo(userChannelDTO2);
        userChannelDTO2.setId(userChannelDTO1.getId());
        assertThat(userChannelDTO1).isEqualTo(userChannelDTO2);
        userChannelDTO2.setId(2L);
        assertThat(userChannelDTO1).isNotEqualTo(userChannelDTO2);
        userChannelDTO1.setId(null);
        assertThat(userChannelDTO1).isNotEqualTo(userChannelDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(userChannelMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(userChannelMapper.fromId(null)).isNull();
    }
}
