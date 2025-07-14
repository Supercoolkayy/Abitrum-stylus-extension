use stylus_sdk::{prelude::*, storage::*, call::*, evm};
use alloy_primitives::{Address, U256, B256, Bytes};
use alloy_sol_types::{sol, SolError, SolEvent};

sol! {
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 value
    );
    
    error InsufficientBalance(
        address account,
        uint256 required,
        uint256 available
    );
}

#[storage]
pub struct TokenContract {
    balances: StorageMap<Address, U256>,
    total_supply: StorageU256,
    owner: StorageAddress,
}

#[external]
impl TokenContract {
    pub fn new() -> Self {
        Self {
            balances: StorageMap::new(),
            total_supply: StorageU256::new(),
            owner: StorageAddress::new(),
        }
    }
    
    #[view]
    pub fn balance_of(&self, account: Address) -> U256 {
        self.balances.get(account)
    }
    
    #[view]
    pub fn total_supply(&self) -> U256 {
        self.total_supply.get()
    }
    
    #[payable]
    pub fn transfer(&mut self, to: Address, amount: U256) -> Result<(), Vec<u8>> {
        let sender = msg::sender();
        let sender_balance = self.balances.get(sender);
        
        if sender_balance < amount {
            return Err(InsufficientBalance {
                account: sender,
                required: amount,
                available: sender_balance,
            }.encode());
        }
        
        // Safe math operations
        let new_sender_balance = sender_balance
            .checked_sub(amount)
            .ok_or("Arithmetic overflow".as_bytes().to_vec())?;
            
        let new_to_balance = self.balances.get(to)
            .checked_add(amount)
            .ok_or("Arithmetic overflow".as_bytes().to_vec())?;
        
        self.balances.set(sender, new_sender_balance);
        self.balances.set(to, new_to_balance);
        
        // Emit event
        Transfer {
            from: sender,
            to,
            value: amount,
        }.emit();
        
        Ok(())
    }
    
    fn only_owner(&self) -> Result<(), Vec<u8>> {
        if msg::sender() != self.owner.get() {
            return Err("Not authorized".as_bytes().to_vec());
        }
        Ok(())
    }
} 

fn only_owner(&self) -> Result<(), Vec<u8>> {
    if msg::sender() != self.owner.get() {
        return Err("Not authorized".as_bytes().to_vec());
    }
    Ok(())
}

use stylus_sdk::{prelude::*, storage::*};
use alloy_primitives::{Address, U256};

#[storage]
pub struct  {
    field_name: StorageU256,
}

#[external]
impl  {
    pub fn function_name(&self) -> Result<(), Vec<u8>> {
        // Implementation
        Ok(())
    }
}

use stylus_sdk::{prelude::*, storage::*};
use alloy_primitives::{Address, U256};

#[storage]
pub struct TestContract {
    field_name: StorageU256,
}

#[external]
impl TestContract {
    pub fn function_name(&self) -> Result<(), Vec<u8>> {
        // Implementation
        Ok(())
    }
}
#[entrypoint]


#[view]
pub fn function_name(&self) -> U256 {
    // Implementation
    self.field.get()
}
sol! {
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 value
    );
    
    error InsufficientBalance(
        address account,
        uint256 required,
        uint256 available
    );
}

#[storage]  
#[view] 
let result = value1
    .checked_add(value2)
    .ok_or("Arithmetic overflow".as_bytes().to_vec())?;


stylus-