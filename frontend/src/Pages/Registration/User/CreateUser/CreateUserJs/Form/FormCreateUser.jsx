import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Form, Input, Label, Row, FormFeedback, Button, Spinner, Progress } from 'reactstrap';
import { useRegister } from '../../../../../../context/RegisterContext/useRegister';
import { useAuth } from '../../../../../../context/AuthContext/useAuth';
import imgAvatar from '../../../../../../assets/utils/images/avatars/avatar-blank.png';

const FormCreateUserGroup = () => {
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginExists, setLoginExists] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [avatarUrl, setAvatarUrl] = useState("");
  const [profileList, setProfileList] = useState([]);
  const [userGroupList, setUserGroupList] = useState([]);
  const [cargoList, setCargoList] = useState([
    { id: 1, name: "Administrador" },
    { id: 2, name: "Usuário" },
    { id: 3, name: "Gerente" },
    { id: 4, name: "Diretor" },
    { id: 5, name: "Presidente" },

  ]);

  const [selectedCargo, setSelectedCargo] = useState('');
  const [selectedProfile, setSelectedProfile] = useState('');
  const [selectedUserGroup, setSelectedUserGroup] = useState('');



  const { createUser, checkLogin, listProfile, listUserGroup, loading, loadingUpdate } = useRegister();
  const { user } = useAuth();


  useEffect(() => {
    loadProfile();
    loadUserGroup();

  }, []);

  const loadProfile = async () => {
    const profile = await listProfile();
    setProfileList(profile);
  };

  const loadUserGroup = async () => {
    const userGroup = await listUserGroup();

    setUserGroupList(userGroup);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const {
      nome,
      email,

      password,
      login,
    } = Object.fromEntries(form.entries());


    let avatar = form.get('avatar');

    if (avatar.size === 0) {
      avatar = new File([imgAvatar], 'avatar.png', { type: 'image/png' });
    }

    form.append('file', avatar);

    const formData = new FormData();
    formData.append('name', nome);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('login', login);
    formData.append('cargo', selectedCargo);
    formData.append('id_perfil', new Number(selectedProfile));
    formData.append('id_grupo', new Number(selectedUserGroup));
    formData.append('id_empresa', new Number(user.empresa?.id_empresa));
    formData.append('id_user', new Number(user.id));
    formData.append('file', avatar);


    await createUser(formData);
    setUploadProgress(0);

  };

  const handleNameBlur = (event) => {
    const { value } = event.target;
    // Check if the "nome_grupo" field has a size smaller or equal to 5
    if (value.length <= 1) {
      setNameError(true); // Set the error state to true
    } else {
      setNameError(false); // Set the error state to false if the validation passes
    }
  };

  const handleEmailBlur = (event) => {
    const { value } = event.target;
    // Check if the "email" is valid using a regular expression (regex)
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(value)) {
      setEmailError(true); // Set the error state to true
    } else {
      setEmailError(false); // Set the error state to false if the validation passes
    }
  };

  const handleLoginBlur = async (event) => {
    const { value } = event.target;
    const data = {
      login: value,
      id_empresa: user.empresa?.id_empresa
    }

    //Check if the "login" field has a size smaller or equal to 5
    if (value.length <= 1) {
      setLoginError(true); // Set the error state to true
    }
    else {
      const loginExists = await checkLogin(data);
      if (loginExists) {
        setLoginExists(true); // Set the error state to true
      } else {
        setLoginError(false); // Set the error state to false if the validation passes
        setLoginExists(false);
      }
    }



  };

  const handlePasswordBlur = (event) => {
    const { value } = event.target;
    // Valid strong password with 8 characters

    if (value.length <= 8) {
      setPasswordError(true); // Set the error state to true
    } else {
      setPasswordError(false); // Set the error state to false if the validation passes
    }
  };


  const handleFileChange = (e) => {
    setAvatarUrl(null);
    const file = e.target.files[0];
    setAvatarUrl(URL.createObjectURL(file));

    if (file) {
      const reader = new FileReader();
      reader.onloadstart = () => setUploadProgress(0);
      reader.onprogress = (progressEvent) => {
        if (progressEvent.lengthComputable) {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        }
      };
      reader.onloadend = () => setUploadProgress(100);
      reader.readAsDataURL(file);
    } else {
      setUploadProgress(0);
    }
  }


  return (
    <Card className="main-card mb-3">
      <CardBody>
        {loading &&
          <div className="text-center"><Spinner color="primary" /></div>}


        <Form onSubmit={handleSubmit}>
          <Row className='mb-2'>
            <Col md={4} className="d-flex flex-column justify-center align-items-center">
              <Label>Foto</Label>
              <Label className="w-40 h-40 bg-slate-400 rounded-full flex flex-col justify-center align-items-center cursor-pointer">
                <span className="absolute opacity-50 hover:opacity-100">
                  <i className="pe-7s-cloud-upload text-5xl"></i>
                </span>
                <Input
                  type="file"
                  name="avatar"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                  hidden
                />
                {avatarUrl && <img src={avatarUrl} alt="avatar" className="w-full h-full rounded-full" />}
              </Label>
              {uploadProgress >= 0 && (
                <div className="mt-1 w-3/4">
                  <Progress animated color='success' value={uploadProgress}>
                    {uploadProgress}%
                  </Progress>

                </div>
              )}
            </Col>
            <Col md={8}>
              <Row>
                <Col md={12}>
                  <Label for="nome">Nome</Label>
                  <Input
                    required
                    type="text"
                    name="nome"
                    placeholder="Nome do Usuário"
                    onBlur={handleNameBlur}
                    invalid={nameError}
                    valid={!nameError}
                  />
                  <FormFeedback>
                    {nameError && "Nome é obrigatório e deve ter mais de 2 caracteres"}
                  </FormFeedback>
                </Col>
                <Col md={12}>
                  <Label for="descricao_grupo">Email</Label>
                  <Input
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    onBlur={handleEmailBlur}
                    invalid={emailError}
                    valid={!emailError}
                  />
                  <FormFeedback>
                    {emailError && "Email é obrigatório e deve ser válido"}
                  </FormFeedback>
                </Col>
              </Row>
              <Row>
                <Col md={5}>
                  <Label for="login">Login</Label>
                  <Input
                    required
                    type="text"
                    name="login"
                    placeholder="Login"
                    onBlur={handleLoginBlur}
                    invalid={loginError || loginExists}
                    valid={!loginError && !loginExists}

                  />

                  <FormFeedback>
                    {loginError && "Login é obrigatório e deve ter mais de 2 caracteres"}
                    {loginExists && "Login já existe"}
                  </FormFeedback>
                </Col>
                <Col md={5}>
                  <Label for="password">Senha</Label>
                  <Input
                    required
                    type="password"
                    name="password"
                    placeholder="Senha"
                    onBlur={handlePasswordBlur}
                    invalid={passwordError}
                    valid={!passwordError}
                  />
                  <FormFeedback>
                    {passwordError && "Senha é obrigatória e deve ter mais de 8 caracteres"}
                  </FormFeedback>
                </Col>
                <Col md={2}>
                  <Row>
                    <Col>
                      <Label for="ativo">Ativo</Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Input type="checkbox" name="ativo" defaultChecked={true} />
                    </Col>
                  </Row>
                </Col>


              </Row>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Label for="cargo">Cargo</Label>

              <Input type="select" name="cargo" placeholder="Cargo" onChange={(e) => setSelectedCargo(e.target.value)}>
                <option value="">{''}</option> {/* Empty option */}
                {cargoList.map((cargo) => (
                  <option key={cargo.id} value={cargo.id}>
                    {cargo.name}
                  </option>
                ))}
              </Input>




            </Col>
            <Col md={4}>
              <Label for="perfil">Perfil de Usuário</Label>
              <Input type="select" name="grupo" placeholder="Grupo de Usuário"
                onChange={(e) => setSelectedProfile(e.target.value)}
              > <option value="">{''}</option>
                {profileList.map((profile) => (
                  <option key={profile.id_perfil} value={profile.id_perfil}>
                    {profile.nome_perfil}
                  </option>
                ))}

              </Input>
            </Col>
            <Col md={4}>
              <Label for="grupo">Grupo de Usuário</Label>
              <Input type="select" name="grupo" placeholder="Grupo de Usuário"
                onChange={(e) => setSelectedUserGroup(e.target.value)}
              > <option value="">{''}</option>
                {userGroupList.map((group) => (
                  <option key={group.id_grupo} value={group.id_grupo}>
                    {group.nome_grupo}
                  </option>
                ))}

              </Input>
            </Col>
            <Col md={12}>
              <div className="text-center">
                {nameError || emailError || loginError || passwordError || loading || loginExists ? (
                  <Button color="primary" className="mt-4" disabled>
                    Criar Usuário
                  </Button>
                ) : (
                  <Button color="primary" className="mt-4" outline type="submit">
                    Criar Usuário
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Form>



      </CardBody>
    </Card>
  );
};

export default FormCreateUserGroup;
