// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FoodTracking {
    struct QualityCheck {
        uint256 timestamp;
        string inspector;
        string result;
        string notes;
    }

    struct LogisticsRecord {
        uint256 timestamp;
        string location;
        string handler;
        string status;
        string temperature;
    }

    struct FoodProduct {
        uint256 id;
        string name;
        string origin;
        uint256 productionDate;
        string producer;
        string batchNumber;
        bool isOrganic;
        string[] ingredients;
        QualityCheck[] qualityChecks;
        LogisticsRecord[] logisticsRecords;
        bool isActive;
    }

    mapping(uint256 => FoodProduct) public products;
    uint256 public productCount;

    event ProductRegistered(uint256 productId, string name, string origin);
    event QualityCheckAdded(uint256 productId, string inspector, string result);
    event LogisticsUpdated(uint256 productId, string location, string status);

    function registerProduct(
        string memory _name,
        string memory _origin,
        string memory _producer,
        string memory _batchNumber,
        bool _isOrganic,
        string[] memory _ingredients
    ) external returns (uint256) {
        productCount++;
        products[productCount] = FoodProduct({
            id: productCount,
            name: _name,
            origin: _origin,
            productionDate: block.timestamp,
            producer: _producer,
            batchNumber: _batchNumber,
            isOrganic: _isOrganic,
            ingredients: _ingredients,
            qualityChecks: new QualityCheck[](0),
            logisticsRecords: new LogisticsRecord[](0),
            isActive: true
        });

        emit ProductRegistered(productCount, _name, _origin);
        return productCount;
    }

    function addQualityCheck(
        uint256 _productId,
        string memory _inspector,
        string memory _result,
        string memory _notes
    ) external {
        require(products[_productId].isActive, "Product not found");
        
        QualityCheck memory check = QualityCheck({
            timestamp: block.timestamp,
            inspector: _inspector,
            result: _result,
            notes: _notes
        });

        products[_productId].qualityChecks.push(check);
        emit QualityCheckAdded(_productId, _inspector, _result);
    }

    function updateLogistics(
        uint256 _productId,
        string memory _location,
        string memory _handler,
        string memory _status,
        string memory _temperature
    ) external {
        require(products[_productId].isActive, "Product not found");
        
        LogisticsRecord memory record = LogisticsRecord({
            timestamp: block.timestamp,
            location: _location,
            handler: _handler,
            status: _status,
            temperature: _temperature
        });

        products[_productId].logisticsRecords.push(record);
        emit LogisticsUpdated(_productId, _location, _status);
    }

    function getProduct(uint256 _productId) external view returns (
        string memory name,
        string memory origin,
        uint256 productionDate,
        string memory producer,
        string memory batchNumber,
        bool isOrganic,
        string[] memory ingredients
    ) {
        require(products[_productId].isActive, "Product not found");
        FoodProduct storage product = products[_productId];
        
        return (
            product.name,
            product.origin,
            product.productionDate,
            product.producer,
            product.batchNumber,
            product.isOrganic,
            product.ingredients
        );
    }

    function getQualityChecks(uint256 _productId) external view returns (QualityCheck[] memory) {
        require(products[_productId].isActive, "Product not found");
        return products[_productId].qualityChecks;
    }

    function getLogisticsRecords(uint256 _productId) external view returns (LogisticsRecord[] memory) {
        require(products[_productId].isActive, "Product not found");
        return products[_productId].logisticsRecords;
    }
}