enum Role {
  USER,ADMIN
}

export class SignupRequest {
   fullName?: String
   username?: String
   password?: String
   role?: Role
}
