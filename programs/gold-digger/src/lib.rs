use anchor_lang::prelude::*;

declare_id!("GD1gUzFPzJP1xwdDVbYgbQmRQgmrDvPGNFSZ3KC1HXpx");

#[program]
pub mod gold_digger {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let gold_digger_state = &mut ctx.accounts.gold_digger_state;
        gold_digger_state.authority = ctx.accounts.authority.key();
        gold_digger_state.total_staked = 0;
        gold_digger_state.total_rewards_distributed = 0;
        Ok(())
    }

    pub fn stake_nft(ctx: Context<StakeNFT>) -> Result<()> {
        let gold_digger_state = &mut ctx.accounts.gold_digger_state;
        let staking_account = &mut ctx.accounts.staking_account;
        
        staking_account.owner = ctx.accounts.owner.key();
        staking_account.nft_mint = ctx.accounts.nft_mint.key();
        staking_account.stake_time = Clock::get()?.unix_timestamp;
        staking_account.last_claim_time = Clock::get()?.unix_timestamp;
        staking_account.is_staked = true;
        
        gold_digger_state.total_staked += 1;
        
        Ok(())
    }

    pub fn unstake_nft(ctx: Context<UnstakeNFT>) -> Result<()> {
        let gold_digger_state = &mut ctx.accounts.gold_digger_state;
        let staking_account = &mut ctx.accounts.staking_account;
        
        require!(staking_account.is_staked, ErrorCode::NotStaked);
        require!(staking_account.owner == ctx.accounts.owner.key(), ErrorCode::NotOwner);
        
        // Calculate rewards
        let current_time = Clock::get()?.unix_timestamp;
        let time_staked = current_time - staking_account.last_claim_time;
        let rewards = calculate_rewards(time_staked);
        
        // Transfer rewards logic would go here
        
        staking_account.is_staked = false;
        gold_digger_state.total_staked -= 1;
        gold_digger_state.total_rewards_distributed += rewards;
        
        Ok(())
    }

    pub fn claim_rewards(ctx: Context<ClaimRewards>) -> Result<()> {
        let gold_digger_state = &mut ctx.accounts.gold_digger_state;
        let staking_account = &mut ctx.accounts.staking_account;
        
        require!(staking_account.is_staked, ErrorCode::NotStaked);
        require!(staking_account.owner == ctx.accounts.owner.key(), ErrorCode::NotOwner);
        
        // Calculate rewards
        let current_time = Clock::get()?.unix_timestamp;
        let time_staked = current_time - staking_account.last_claim_time;
        let rewards = calculate_rewards(time_staked);
        
        // Transfer rewards logic would go here
        
        staking_account.last_claim_time = current_time;
        gold_digger_state.total_rewards_distributed += rewards;
        
        Ok(())
    }
}

fn calculate_rewards(time_staked: i64) -> u64 {
    // Simple reward calculation: 10 tokens per day
    let seconds_in_day = 86400;
    let daily_rate = 10;
    
    ((time_staked as f64 / seconds_in_day as f64) * daily_rate as f64) as u64
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 8 + 8
    )]
    pub gold_digger_state: Account<'info, GoldDiggerState>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct StakeNFT<'info> {
    #[account(mut)]
    pub gold_digger_state: Account<'info, GoldDiggerState>,
    
    #[account(
        init,
        payer = owner,
        space = 8 + 32 + 32 + 8 + 8 + 1,
        seeds = [b"staking", nft_mint.key().as_ref()],
        bump
    )]
    pub staking_account: Account<'info, StakingAccount>,
    
    pub nft_mint: Account<'info, Mint>,
    
    #[account(mut)]
    pub owner: Signer<'info>,
    
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct UnstakeNFT<'info> {
    #[account(mut)]
    pub gold_digger_state: Account<'info, GoldDiggerState>,
    
    #[account(
        mut,
        seeds = [b"staking", nft_mint.key().as_ref()],
        bump
    )]
    pub staking_account: Account<'info, StakingAccount>,
    
    pub nft_mint: Account<'info, Mint>,
    
    #[account(mut)]
    pub owner: Signer<'info>,
    
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct ClaimRewards<'info> {
    #[account(mut)]
    pub gold_digger_state: Account<'info, GoldDiggerState>,
    
    #[account(
        mut,
        seeds = [b"staking", nft_mint.key().as_ref()],
        bump
    )]
    pub staking_account: Account<'info, StakingAccount>,
    
    pub nft_mint: Account<'info, Mint>,
    
    #[account(mut)]
    pub owner: Signer<'info>,
    
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct GoldDiggerState {
    pub authority: Pubkey,
    pub total_staked: u64,
    pub total_rewards_distributed: u64,
}

#[account]
pub struct StakingAccount {
    pub owner: Pubkey,
    pub nft_mint: Pubkey,
    pub stake_time: i64,
    pub last_claim_time: i64,
    pub is_staked: bool,
}

#[error_code]
pub enum ErrorCode {
    #[msg("NFT is not staked")]
    NotStaked,
    #[msg("Not the owner of the staked NFT")]
    NotOwner,
}

use anchor_spl::token::{Mint, Token};
