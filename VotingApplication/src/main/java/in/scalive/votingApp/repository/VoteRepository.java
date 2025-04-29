package in.scalive.votingApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.scalive.votingApp.entity.Vote;

public interface VoteRepository extends JpaRepository<Vote, Long>{

}

