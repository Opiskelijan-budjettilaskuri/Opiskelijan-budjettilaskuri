package fi.opiskelijan.budjettilaskuri.config;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import fi.opiskelijan.budjettilaskuri.repository.KayttajaRepository;
import fi.opiskelijan.budjettilaskuri.domain.Kayttaja;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    private final KayttajaRepository repository;

    public UserDetailServiceImpl(KayttajaRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Login attempt for user: " + username);
        Kayttaja currUser = repository.findByUsername(username);
        if (currUser == null) {
            throw new UsernameNotFoundException("User not found");
        }
        
        return new org.springframework.security.core.userdetails.User(
            username,
            currUser.getPassword(),
            AuthorityUtils.createAuthorityList("USER")
        );
    }
}
