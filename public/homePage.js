"use strict";

//const { response } = require("express"); 

//const { response } = require("express");

//const { response } = require("express");

//const { response } = require("express");

//const { response } = require("express");

//const { response } = require("express");

//const { response } = require("express");

//const { response } = require("express");

//const { response } = require("express");

//const { response } = require("express");

//Не понял, зачем создавались эти строки, без них все заработало.

const logoutButton = new LogoutButton;
logoutButton.action = () => ApiConnector.logout(response => {
    if (response.success === true) {
        location.reload();
    }
});

ApiConnector.current(response => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard;

ApiConnector.getStocks(response => {
    if (response.success === true) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    }
});

const moneyManager = new MoneyManager;

moneyManager.addMoneyCallback = (data) => ApiConnector.addMoney(data, response => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, "Средства зачислены на счет");
    } else {
        moneyManager.setMessage(response.success, response.error);
    }
});

moneyManager.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, response => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, "Конвертирование валюты завершено");
    } else {
        moneyManager.setMessage(response.success, response.error);
    }
});

moneyManager.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, response => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, "Перевод выполнен");
    } else {
        moneyManager.setMessage(response.success, response.error);
    }
});

const favoritesWidget = new FavoritesWidget;

ApiConnector.getFavorites(response => {
    if (response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, response => {
    if (response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(response.success, "Пользователь добавлен");
    } else {
        favoritesWidget.setMessage(response.success, response.error);
    }
});

favoritesWidget.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(response.success, "Пользователь удален");
    } else {
        favoritesWidget.setMessage(response.success, response.error);
    }
});