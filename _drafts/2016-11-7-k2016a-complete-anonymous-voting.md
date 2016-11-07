---
title: k2016a — The Anonymous Voting Algorithm with No Funky Crypto
author: Max Kaye
date: 7-11-2016
layout: about
---

Here is an algorithm for complete and anonymous voting using no crazy new crypto like zero-knowledge proofs.
This is a nice feature since ZKPs are very recent, and recency in crypto-land is a red flag.
This algorithm relies only on ECC and hashing, so if both of those are secure we are good to go.

Briefly put we use a double-round oblivious shuffle with small groups in a large population.
The result of each shuffle is published, and both shuffles atomically succeed or fail, and are verifiable from the 'outside' without any special knowledge.

Our only assumption is there is a whitelist of voters, identified only by ECC public key.

This system is heavily inspired by CoinJoin and CoinShuffle, respectively 1 and 2 in the citations list.

We need to call this something so I'm calling it `Kaye-2016-a` or `k2016a` for short. Not sexy but ¯\\\_(ツ)\_/¯

Onwards!

## Anonymous Verification

I'll start with the end since it's easiest to understand (and helps with the other elements).

Let's presume we have two things:

* A sorted list of 100 votes (particularly, votes with _nonces_)
* A list of 100 signatures, all signing the hash of our sorted list of votes

Thus we can establish

* If all 100 signatures belong to valid identities
  * Nobody voted twice
  * All 100 valid voters are accounted for in this 'box' of votes
* If all 100 votes are valid (abstentions presumably allowed)
  * Each voter can identify their vote because they chose the nonce
  * They can not prove their vote to anyone else as they could claim the vote of any other participant in that box (nonces are not cryptographically linked to the identity)
  * If they _really_ wanted to prove their vote to someone they technically can choose a nonce in advance. There might be a solution for this later, for now: ¯\\\_(ツ)\_/¯.

This is the cryptographic equivalent to a ballot box: 

* 100 valid voters all acquire ballots.
* The fold them up, put them in the box.
* The box is emptied and counted.

Worth a note is that if you really wanted to prove to someone you voted a particular way there are several tactics:

* Mark the ballot with a weird signature (possibly a special way of drawing the numbers) — equivelant to using a nonce
* Use the Least-Significant-Votes on a long ballot (like Australia's notorious Senate ballots) to embed a special signature
  * All votes in Australia are published after the election (as they should be)

So secret ballot is pretty much upheld as well as it is today.

## Oblivious shuffle

The main device used here is the oblivious shuffle. 
It's a way to take data from actors and provide a shuffled list such that nobody knows which data was submitted by which actor.
Each actor can verify their data was included.
It's explained well in the CoinShuffle paper, but I'll lay it out again here:

* There are N participants
* They all generate ephemeral keys
* They all share public keys with each other
* They arrange themselves in a line
* Position 1 starts by encrypting their secret data in layers:
  * First with PK[N]
  * Then with PK[N-1]
  * ...
  * Then with PK[2] _last_
  * Then Position 1 passes their many-times-encrypted secret data to position 2
* Position 2 _decrypts_ their layer
* Position 2 encrypts their data with PK[N], then PK[N-1], ...., then PK[3]
* Position 2 passes _both_ encrypted data to Pos3 in a shuffled order
* ...
* Position k takes k-1 layered, encrypted data
	* Decrypts the outside layer (encrypted with PK[k])
	* Encrypts their data with PK[N], PK[N-1], ..., PK[k+1]
	* Passes all encrypted data to Position k+1 in a shuffled order
* This continues to position N
	* Pos N decrypts the final layer from all secret data
	* Adds her data to the mix
	* Shuffles one last time
	* Publishes the full list

At this point anyone can cry foul if their secret data wasn't included as described in the CoinShuffle paper. 
TL;DR is that by publishing all the messages and ephemeral keys the full algorithm becomes public and the point of failure can be determined and the offender blacklisted.

## Chaining it all together

* First 100 voters come together for Round 1, all signing an ephemeral public key (EPK-1) with their voter ID and sharing it with the group.
* Then they generate a SECOND ephemeral key pair (EPK-2) but keep the public key secret
* EPK-2 public keys are the data used in the first shuffle
* We now have a list of EPK-2 public keys associated with 100 voters in such a way that each voter (or MITM, or whomever) doesn't know which EPK-2 PK belongs to which actor.

This first Round 1 takes place many times with many different groups before the real vote begins.

* A new group of 100 voters which have completed Round 1 come together.
* They all prove they have completed round 1 and not yet spent their vote.
* They use their `vote + nonce` as the data for the second oblivious shuffle with their newly created EPK-2.
* Now we have a list of votes associated with EPK-2s which are themselves associated with real voters.

At the end of this process we can see that the total number of votes equals the total number of voters, can ensure nobody has voted twice because the shuffles must be successfully completed both times, guaranteeing that real voters a) had a valid EPK-2 shuffled, and b) had their valid vote shuffled.

This means that with a large population of voters we can anonymously shuffle votes in such a way that:

* When an attacker attempts to compromise the system they can either associate an EPK-2 with a voter ID, or associate an EPK-2 with a vote, but not both.

While you technically can try to DoS someone, you need to do this continuously but since you can blacklist people someone either needs lots of voter IDs or lots of EPK-2s, and even then it's really difficult.
So an attacker (with _many_ valid voter IDs) might be able to DoS one person for a long time or a large number of people for a short time but they very quickly burn their ability to do so.

## Why Two Rounds?

If we had one round (voter ID -> vote) when someone attempted to manipulate the system you would need to reveal your vote in order to identify the attacker.
By using two rounds (voter ID -> EPK-2; EPK-2 -> vote) we don't have that problem, but it does unfortunately take 2x the number of signature verifications (which is a bummer).

## Wishlist

* How do we do this with just one signature verification?

## What is this going to be used for?

[Flux](https://voteflux.org)'s secure voting platform.

## Has anyone else thought of this?

I don't know.
Please let me know if they have: m [at] xk [dot] io

## Better than Zero Knowledge Proofs?

Hell yeah. ZKPs take KILOBYTES of data (for now), but this protocol only takes ~200 bytes per vote, which means that 1 billion votes can be run with 2 billion signature verifications and only take 200 GB of storage.

## Blockchain Proof of Existence

Check out [this](https://www.blocktrail.com/BTC/tx/4ba14a5be4fcad7d2b2fe43092d5b725ff49bb52a5f9e1d989f1403fdc8b204f#tx_messages) transaction. (4ba14a5be4fcad7d2b2fe43092d5b725ff49bb52a5f9e1d989f1403fdc8b204f)

It has a nulldata output: `6a234d61784b6179652d6b32303136612d75eebd046158ca1e8c39872f4fff582fe1407502`

Decoded this is `MaxKaye-k2016a-<then some binary>`

The two parts are `6a234d61784b6179652d6b32303136612d` and `75eebd046158ca1e8c39872f4fff582fe1407502` (this second part is the binary above)

Notice the commit hash in this url is the same as the binary data above: https://github.com/xk-io/xk-io.github.io/commit/75eebd046158ca1e8c39872f4fff582fe1407502

Go there and see that it's the initial commit for this document!

Woo! Proof of existence achieved!

## Citations

* 1 : https://bitcointalk.org/index.php?topic=279249 — Greg Maxwell (2013-08-22)
* 2 : http://crypsys.mmci.uni-saarland.de/projects/CoinShuffle/coinshuffle.pdf — Ruffing, Tim; Moreno-Sanchez, Pedro; Kate, Aniket (2014-08-14)
