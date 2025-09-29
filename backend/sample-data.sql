USE bridging_roots;

-- Drop tables if they exist
DROP TABLE IF EXISTS words;
DROP TABLE IF EXISTS scores;

-- Create words table
CREATE TABLE words (
  id INT AUTO_INCREMENT PRIMARY KEY,
  letter VARCHAR(10),
  sen_word VARCHAR(50),
  english_meaning VARCHAR(100)
);

-- Seed words table
INSERT INTO words (letter, sen_word, english_meaning) VALUES
('A', 'AXEN_', 'to say'),
('Á', 'ÁSW̱', 'seagull'),
('Á', 'XPȺ', 'fern'),
('B', 'BISEJ', 'pinecone'),
('C', 'CEPU', 'jacket'),
('Ć', 'ĆESE', 'two'),
('Ø', 'ȻOSEN', 'star'),
('D', 'DIL¸EḰ', 'strawberry'),
('E', 'ESE', 'I'),
('H', 'HILEṈ', 'fall off'),
('I', 'IST', 'deer'),
('J', 'JESḴEN', 'raven'),
('K', 'KAKU', 'bear'),
('K', 'KELEN', 'ear'),
('K', 'ḴAḴ', 'baby'),
('Ḱ', 'ḰOKEḰE', 'drinking water'),
('L', 'LOX̱ENE', 'canadian goose'),
('Ł', 'ŁOBEN', 'spoon'),
('M', 'MUSMES', 'cow'),
('N', 'NEȾE', 'one'),
('N', 'NOS', 'number 4'),
('O', 'OPEN', 'number 10'),
('P', 'PUS', 'cat'),
('Q', 'QESḴEḴ', 'robin'),
('S', 'SŌL', 'door'),
('Ś', 'ŚÍPEN', 'knife'),
('T', 'TENEḴSEN', 'hummingbird'),
('F', 'ŦOŦEN', 'mouth'),
('Ṯ', 'ṮEṮÁĆES', 'island'),
('U', 'HEMU', 'pigeon'),
('W', 'WEXES', 'frog'),
('W', 'W̱ITEṈ', 'jump'),
('X', 'XŦEM', 'chest'),
('X', 'X̱I¸LEM', 'rope'),
('Y', 'YEYOSEṈ', 'play');

-- Create scores table
CREATE TABLE scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_name VARCHAR(100),
  game VARCHAR(100),
  points INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

