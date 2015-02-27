<?php
require '../vendor/Slim/Slim/Slim.php';

$app = new Slim();

//#/users/
$app->get('/users', 'getUsers');
$app->get('/users/:id', 'getUser');
$app->get('/users/search/:email', 'findByEmail');
$app->post('/users', 'addUser');
// $app->delete('/users/:id', 'deleteUser');

//#/friends/
$app->get('/friends', 'getFriends');
$app->get('/friends/:id', 'getFriend');
$app->post('/friends', 'addFriend');
$app->run();

function getUsers()
{
  $sql = "select * FROM users ORDER BY name LIMIT 10";

  try {
    $db = getConnection();
    $stmt = $db->query($sql);
    $data = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;

    echo '{"users": ' . json_encode($data) . '}';
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function getUser($id)
{
  $sql = "SELECT * FROM users WHERE id=:id";

  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $data = $stmt->fetchObject();
    $db = null;

    echo json_encode($data);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function addUser()
{
  error_log('addUser\n', 3, '/var/tmp/php.log');
  $request = Slim::getInstance()->request();
  $data = json_decode($request->getBody());
  $sql = "INSERT INTO users (name, email) VALUES (:name, :email)";

  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("name", $data->name);
    $stmt->bindParam("email", $data->email);
    $stmt->execute();
    $data->id = $db->lastInsertId();
    $db = null;

    echo json_encode($data);
  } catch(PDOException $e) {
    error_log($e->getMessage(), 3, '/var/tmp/php.log');
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function deleteUser($id)
{
  $sql = "DELETE FROM users WHERE id=:id";
  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $db = null;
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function findByEmail($email) {
  $sql = "SELECT * FROM users WHERE UPPER(email) LIKE :email";

  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $email = "%".$email."%";
    $stmt->bindParam("email", $email);
    $stmt->execute();
    $user = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;

    echo json_encode($user);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

//#/friends/
function getFriends()
{
  $sql = "select * FROM friends ORDER BY name LIMIT 10";

  try {
    $db = getConnection();
    $stmt = $db->query($sql);
    $data = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;

    echo '{"friends": ' . json_encode($data) . '}';
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function getFriend($id)
{
  $sql = "SELECT * FROM friends WHERE id=:id";

  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("id", $id);
    $stmt->execute();
    $data = $stmt->fetchObject();
    $db = null;

    echo json_encode($data);
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function addFriend()
{
  error_log('addFriend\n', 3, '/var/tmp/php.log');
  $request = Slim::getInstance()->request();
  $data = json_decode($request->getBody());
  $sql = "INSERT INTO friends (id_friend, name, email) VALUES (:id_friend, :name, :email)";

  // if (json_encode($data->name == '')) {
  //   echo "It's empty!!!";
  // }

  try {
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("id_friend", $data->id_friend);
    $stmt->bindParam("name", $data->name);
    $stmt->bindParam("email", $data->email);
    $stmt->execute();
    $data->id = $db->lastInsertId();
    $db = null;

    echo json_encode($data);
  } catch(PDOException $e) {
    error_log($e->getMessage(), 3, '/var/tmp/php.log');
    echo '{"error":{"text":'. $e->getMessage() .'}}';
  }
}

function getConnection()
{
  $dbhost="localhost";
  $dbuser="root";
  $dbpass="";
  $dbname="anacapri";
  $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
  $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  return $dbh;
}
