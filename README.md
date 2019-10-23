# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## messageテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|
|image|text|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :groups
- belongs_to :use


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null:false|
|email|string|null:false|
|password|string|null:false,unique:ture|

### Association
- has_many :message
- has_many :groups_users
  has_meny :groups,through: groups_users


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|groupe_name|string|null:false, unique:true|

### Association
- has_many :message
  has_meny :groups_users
  has_many :users,through: groups_users
- 


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :use