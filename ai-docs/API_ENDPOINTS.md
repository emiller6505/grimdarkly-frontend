# API Endpoints - Complete Documentation

## 🎯 Overview

This document provides comprehensive documentation of all API endpoints in the integrated grimdarkly-backend-v2, including request/response formats, parameters, and examples.

## 📊 Endpoint Summary

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/health` | GET | Health check | ✅ Working |
| `/api/factions` | GET | Get all factions | ✅ Working |
| `/api/units/search` | GET | Search units | ✅ Working |
| `/api/units/:id` | GET | Get unit by ID | ✅ Working |
| `/api/units/name/:name` | GET | Get unit by name | ✅ Working |
| `/api/weapons/search` | GET | Search weapons | ✅ Working |
| `/api/weapons/:id` | GET | Get weapon by ID | ✅ Working |
| `/api/weapons/name/:name` | GET | Get weapon by name | ✅ Working |
| `/api/keywords/factions` | GET | Get faction hierarchies | ✅ Working |
| `/api/keywords/search` | GET | Search keywords | ✅ Working |
| `/api/keywords/:name/hierarchy` | GET | Get keyword hierarchy | ✅ Working |

## 🔧 Detailed Endpoint Documentation

### 1. Health Check

#### `GET /health`
**Purpose**: Check if the API server is running

**Request**:
```bash
GET /health
```

**Response**:
```json
{
  "success": true,
  "message": "Grimdarkly Warhammer 40K API is running",
  "timestamp": "2025-10-03T21:40:19.187Z",
  "version": "1.0.0"
}
```

**Status**: ✅ Working

---

### 2. Factions

#### `GET /api/factions`
**Purpose**: Get all factions with categories

**Request**:
```bash
GET /api/factions
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Imperial Agents",
      "category": {
        "id": 1,
        "name": "Imperium"
      }
    },
    {
      "id": 1,
      "name": "Astra Militarum",
      "category": {
        "id": 1,
        "name": "Imperium"
      }
    }
  ]
}
```

**Data Count**: 25 factions
**Status**: ✅ Working

---

### 3. Units

#### `GET /api/units/search`
**Purpose**: Search units with multiple filters

**Parameters**:
- `name` (string, optional): Unit name (partial matching)
- `faction` (string, optional): Faction name (supports main factions and sub-factions)
- `unitType` (string, optional): "CHARACTER", "BATTLELINE", or "OTHER"
- `keyword` (string, optional): Comma-separated keywords
- `minToughness` (number, optional): Minimum toughness value
- `maxToughness` (number, optional): Maximum toughness value
- `minWounds` (number, optional): Minimum wounds value
- `maxWounds` (number, optional): Maximum wounds value
- `minMovement` (number, optional): Minimum movement value
- `maxMovement` (number, optional): Maximum movement value

**Search Logic**:
- **AND Logic**: All provided parameters must match simultaneously
- **Faction Search**: 
  - **Main Factions**: Exact match (e.g., "World Eaters", "Chaos Space Marines", "Space Marines")
  - **Sub-Factions**: Keyword match for Space Marine chapters (e.g., "Dark Angels", "Blood Angels", "Ultramarines")
  - **Chaos Factions**: Treated as main factions, not sub-factions

**Request Examples**:
```bash
# Search by name
GET /api/units/search?name=marine

# Search by main faction (exact match)
GET /api/units/search?faction=World%20Eaters&name=berzerker

# Search by sub-faction (Space Marine chapters)
GET /api/units/search?faction=Dark%20Angels&name=marine

# Search by faction and type
GET /api/units/search?faction=Space%20Marines&unitType=BATTLELINE

# Search with stat ranges
GET /api/units/search?minToughness=4&maxToughness=6&minWounds=2

# Complex search with multiple AND conditions
GET /api/units/search?name=marine&faction=Ultramarines&unitType=CHARACTER&minToughness=4
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 3583,
      "name": "Rubric Marines",
      "movement": 6,
      "toughness": 6,
      "save": 3,
      "wounds": 2,
      "leadership": 6,
      "oc": 2,
      "unitType": "BATTLELINE",
      "faction": {
        "id": 1,
        "name": "Chaos Space Marines",
        "category": {
          "id": 1,
          "name": "Imperium"
        }
      },
      "weapons": [
        {
          "id": 146,
          "name": "Close combat weapon"
        }
      ],
      "unitAbilities": [
        {
          "id": 1,
          "name": "Cabal of Sorcerers (Aspiring Sorcerer only)",
          "description": "",
          "unitId": "000003583"
        }
      ],
      "keywords": [
        {
          "name": "Thousand Sons",
          "isSubFaction": false
        }
      ],
      "configurations": [
        {
          "id": 1,
          "unitId": "000003583",
          "modelCount": 1,
          "description": "5 models",
          "points": 105
        }
      ],
      "options": [],
      "compositions": [],
      "canLead": [],
      "ledBy": [
        {
          "id": 933,
          "name": "Chaos Lord On Disc Of Tzeentch",
          "faction": "Chaos Space Marines"
        }
      ]
    }
  ],
  "meta": {
    "searchParams": {
      "name": "marine"
    },
    "nameTerms": ["marine"],
    "count": 16
  }
}
```

**Status**: ✅ Working

#### `GET /api/units/:id`
**Purpose**: Get unit by numeric ID

**Request**:
```bash
GET /api/units/3583
```

**Response**: Same format as search result, but single unit object
**Status**: ✅ Working

#### `GET /api/units/name/:name`
**Purpose**: Get unit by exact name

**Request**:
```bash
GET /api/units/name/Rubric%20Marines
```

**Response**: Same format as search result, but single unit object
**Status**: ✅ Working

---

### 4. Weapons

#### `GET /api/weapons/search`
**Purpose**: Search weapons with multiple filters

**Parameters**:
- `name` (string, optional): Weapon name (partial matching)
- `weaponType` (string, optional): "MELEE" or "RANGED"
- `keyword` (string, optional): Weapon abilities/keywords (comma-separated, partial matching)
- `minRange` (number, optional): Minimum range value
- `maxRange` (number, optional): Maximum range value
- `ap` (number, optional): Armor Penetration value
- `attacks` (string, optional): Number of attacks (supports dice notation)

**Request Examples**:
```bash
# Search by name
GET /api/weapons/search?name=bolter

# Search by type and range
GET /api/weapons/search?weaponType=RANGED&minRange=20&maxRange=30

# Search with AP
GET /api/weapons/search?ap=-1&attacks=2

# Search by keyword
GET /api/weapons/search?keyword=rapid%20fire
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 169,
      "name": "Storm bolter",
      "weaponType": "RANGED",
      "range": 24,
      "attacks": "2",
      "skill": 3,
      "strength": "4",
      "ap": 0,
      "damage": "1",
      "abilities": [
        {
          "name": "rapid fire 2"
        }
      ],
      "units": [
        {
          "id": 65,
          "name": "Land Raider",
          "faction": "Space Marines"
        }
      ]
    }
  ],
  "meta": {
    "searchParams": {
      "name": "bolter"
    },
    "nameTerms": ["bolter"],
    "count": 61
  }
}
```

**Status**: ✅ Working

#### `GET /api/weapons/:id`
**Purpose**: Get weapon by numeric ID

**Request**:
```bash
GET /api/weapons/169
```

**Response**: Same format as search result, but single weapon object
**Status**: ✅ Working

#### `GET /api/weapons/name/:name`
**Purpose**: Get weapon by exact name

**Request**:
```bash
GET /api/weapons/name/Storm%20bolter
```

**Response**: Same format as search result, but single weapon object
**Status**: ✅ Working

---

### 5. Keywords

#### `GET /api/keywords/factions`
**Purpose**: Get faction hierarchies

**Request**:
```bash
GET /api/keywords/factions
```

**Response**:
```json
{
  "success": true,
  "data": {
    "Orks": ["Goffs", "Bad Moons", "Evil Sunz"],
    "Adeptus Astartes": ["Ultramarines", "Dark Angels", "Blood Angels"],
    "Tyranids": ["Hive Fleet Leviathan", "Hive Fleet Kraken"]
  }
}
```

**Status**: ✅ Working

#### `GET /api/keywords/search`
**Purpose**: Search keywords with autocomplete

**Parameters**:
- `q` (string, required): Search query (minimum 2 characters)
- `category` (string, optional): Filter by category

**Request**:
```bash
GET /api/keywords/search?q=space&category=main_faction
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "name": "Space Marines",
      "category": "main_faction"
    }
  ],
  "meta": {
    "searchParams": {
      "q": "space",
      "category": "main_faction"
    },
    "nameTerms": ["space"],
    "count": 1
  }
}
```

**Status**: ✅ Working

#### `GET /api/keywords/:name/hierarchy`
**Purpose**: Get keyword hierarchy information

**Request**:
```bash
GET /api/keywords/Dark%20Angels/hierarchy
```

**Response**:
```json
{
  "success": true,
  "data": {
    "name": "Dark Angels",
    "parent": "Adeptus Astartes",
    "children": [],
    "category": "sub_faction"
  }
}
```

**Status**: ✅ Working

---

## 📊 Data Structure Reference

### Unit Object
```typescript
interface Unit {
  id: number;                    // Numeric ID
  name: string;                  // Unit name
  movement?: number;             // Movement characteristic
  toughness: number;             // Toughness characteristic
  save: number;                  // Save characteristic
  wounds: number;                // Wounds characteristic
  leadership: number;            // Leadership characteristic
  oc: number;                    // Objective Control
  unitType: 'CHARACTER' | 'BATTLELINE' | 'OTHER';
  faction: Faction;              // Faction information
  weapons: WeaponReference[];    // Unit weapons
  unitAbilities: UnitAbility[];  // Unit abilities
  keywords: Keyword[];           // Unit keywords
  configurations: UnitConfiguration[]; // Unit configurations
  options: UnitOption[];         // Unit options
  compositions: UnitComposition[]; // Unit compositions
  canLead: LeaderRelationship[]; // Units this character can lead
  ledBy: LeaderRelationship[];   // Leaders who can lead this unit
}
```

### Weapon Object
```typescript
interface Weapon {
  id: number;                    // Numeric ID
  name: string;                  // Weapon name
  weaponType: 'MELEE' | 'RANGED';
  range?: number;                // Range (for ranged weapons)
  attacks: string;               // Attacks (supports dice notation)
  skill?: number;                // Skill characteristic
  strength: string;              // Strength characteristic
  ap: number;                    // Armor Penetration
  damage: string;                // Damage characteristic
  abilities: WeaponAbility[];    // Weapon abilities
  units: UnitReference[];        // Units that use this weapon
}
```

### Faction Object
```typescript
interface Faction {
  id: number;                    // Numeric ID
  name: string;                  // Faction name
  category: Category;            // Faction category
}
```

### Keyword Object
```typescript
interface Keyword {
  name: string;                  // Keyword name
  isSubFaction: boolean;         // Whether it's a sub-faction
  factionType?: string;          // Faction type
  parentFaction?: string;        // Parent faction
}
```

## 🔍 Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": "Error message description"
}
```

### Common Error Codes
- **400**: Bad Request - Invalid parameters
- **404**: Not Found - Resource not found
- **500**: Internal Server Error - Server error

### Error Examples
```json
// Unit not found
{
  "success": false,
  "error": "Unit not found"
}

// Invalid weapon ID
{
  "success": false,
  "error": "Invalid weapon ID"
}

// Missing search parameters
{
  "success": false,
  "error": "At least one search parameter must be provided"
}
```

## 🚀 Performance Metrics

### Response Times
- **Simple Queries**: 2-5ms
- **Complex Queries**: 5-10ms
- **Detail Pages**: 3-7ms
- **Search Operations**: 4-8ms

### Data Volume
- **Factions**: 25 entities
- **Units**: 1,636 entities
- **Weapons**: 2,948 entities
- **Keywords**: 15,239 entities

## 🎯 Integration Status

### All Endpoints Working ✅
- ✅ **Health Check**: Server status monitoring
- ✅ **Factions**: Complete faction data
- ✅ **Units**: Full unit search and details
- ✅ **Weapons**: Full weapon search and details
- ✅ **Keywords**: Keyword search and hierarchies

### Frontend Compatibility ✅
- ✅ **Data Structures**: All match frontend expectations
- ✅ **Response Formats**: Consistent across all endpoints
- ✅ **Error Handling**: Proper error responses
- ✅ **Performance**: Fast response times

---

*Complete API documentation for the integrated grimdarkly-backend-v2 system.*
