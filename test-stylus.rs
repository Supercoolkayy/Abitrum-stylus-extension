// Test file for Arbitrum Stylus VS Code Extension - Milestone 1
// This file should trigger syntax highlighting and snippets

use stylus_sdk::{prelude::*, storage::*};
use alloy_primitives::{Address, U256};

#[storage]
pub struct TestContract {
    owner: StorageAddress,
    balance: StorageU256,
}

#[external]
impl TestContract {
    pub fn new() -> Self {
        Self {
            owner: StorageAddress::new(),
            balance: StorageU256::new(),
        }
    }

    #[view]
    pub fn get_balance(&self) -> U256 {
        self.balance.get()
    }

    #[payable]
    pub fn deposit(&mut self) -> Result<(), Vec<u8>> {
        let value = msg::value();
        let current_balance = self.balance.get();
        self.balance.set(current_balance + value);
        Ok(())
    }
}

// Test snippets by typing:
// stylus-storage
// stylus-view
// stylus-payable
// stylus-event
// stylus-error 